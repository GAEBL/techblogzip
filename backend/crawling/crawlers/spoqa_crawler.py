from .config import driver, ERROR_MESSAGE, SUCESS_MESSAGE, CSS_SELECTOR
from mainapp.models import Company, Post
from datetime import datetime
from tqdm import tqdm
from time import sleep


def get_contents(company):
    posts = Post.objects.filter(company=company, contents='')
    for post in tqdm(posts):
        try:
            driver.get(post.url)
            sleep(10)
        except:
            ERROR_MESSAGE['company'] = company.name
            return ERROR_MESSAGE

        div = CSS_SELECTOR('div.post')[0]
        articles = div.find_elements_by_css_selector('h1')
        articles += div.find_elements_by_css_selector('h2')
        articles += div.find_elements_by_css_selector('h3')
        articles += div.find_elements_by_css_selector('p')

        try:
            image = div.find_element_by_css_selector(
                'img').get_attribute('src')
        except:
            image = ''

        contents = ''
        for article in articles:
            if not article.find_elements_by_css_selector('code'):
                contents += article.text + ' '

        post.contents = contents
        post.image = image
        post.save()

    SUCESS_MESSAGE['company'] = company.name
    return SUCESS_MESSAGE


def get_posts(url):
    print('{:=^100}'.format('START CRAWLING SPOQA'))
    spoqa = Company.objects.get_or_create(
        name='SPOQA', url=url, description='SPOQA')[0]

    cnt = 1
    while True:
        try:
            driver.get(url)
            sleep(10)
        except:
            ERROR_MESSAGE['company'] = spoqa.name
            return ERROR_MESSAGE

        is_errored = CSS_SELECTOR('h1')
        if is_errored:
            if is_errored[0].text == '404':
                return get_contents(spoqa)

        posts = CSS_SELECTOR('li.post-item')
        for post in posts:
            element_selector = post.find_element_by_css_selector

            title = element_selector('span.post-title-words').text
            if Post.objects.filter(company=spoqa, title=title):
                return get_contents(spoqa)

            date = element_selector('span.post-date').text
            date = datetime.strftime(
                datetime.strptime(date, '%Y년 %m월 %d일'), '%Y.%m.%d')
            post_url = element_selector('a').get_attribute('href')

            Post.objects.get_or_create(
                company=spoqa, title=title, contents='', date=date, image='', url=post_url)

        get_next = CSS_SELECTOR('p.next')
        if get_next:
            cnt += 1
            url = f'https://spoqa.github.io/page{cnt}/'
