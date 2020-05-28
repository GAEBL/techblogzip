from .config import driver, ERROR_MESSAGE, SUCESS_MESSAGE, CSS_SELECTOR
from mainapp.models import Company, Post
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

        div = CSS_SELECTOR('div.entry-content.single-page')[0]
        articles = div.find_elements_by_css_selector('p')
        try:
            image = div.find_elements_by_css_selector(
                'img')[0].get_attribute('src')
        except:
            image = ''

        contents = ''
        for article in articles:
            contents += article.text + '\n'

        post.contents = contents
        post.image = image
        post.save()

    SUCESS_MESSAGE['company'] = company.name
    return SUCESS_MESSAGE


def get_posts(url):
    print('{:=^100}'.format('START CRAWLING LINE ENGINEERING'))
    line = Company.objects.get_or_create(
        name='LINE ENGINEERING', url=url, description='LINE ENGINEERING')[0]

    cnt = 1
    while True:
        try:
            driver.get(url)
            sleep(10)
        except:
            ERROR_MESSAGE['company'] = line.name
            return ERROR_MESSAGE

        posts = CSS_SELECTOR('div.article-inner')
        for post in posts:
            element_selector = post.find_element_by_css_selector

            title = element_selector('a.plain').text
            if Post.objects.filter(company=line, title=title):
                return get_contents(line)

            date = element_selector('span.byline').text.lstrip(' | ')
            post_url = element_selector('a.plain').get_attribute('href')

            Post.objects.get_or_create(
                company=line, title=title, contents='', date=date, image='', url=post_url)

        get_next = CSS_SELECTOR('a.next.page-number')
        if get_next:
            cnt += 1
            url = f'https://engineering.linecorp.com/ko/blog/page/{cnt}/'
        else:
            return get_contents(line)
