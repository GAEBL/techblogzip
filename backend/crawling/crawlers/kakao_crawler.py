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

        div = CSS_SELECTOR('div.post-content')[0]
        articles = div.find_elements_by_css_selector('h1')
        articles += div.find_elements_by_css_selector('h2')
        articles += div.find_elements_by_css_selector('h3')
        articles += div.find_elements_by_css_selector('p')

        contents = ''
        for article in articles:
            if not article.find_elements_by_css_selector('code'):
                contents += article.text + ' '

        post.contents = contents
        post.save()

    SUCESS_MESSAGE['company'] = company.name
    return SUCESS_MESSAGE


def get_posts(url):
    print('{:=^100}'.format('START CRAWLING KAKAO TECH'))
    kakao = Company.objects.get_or_create(
        name='KAKAO TECH', url=url, description='KAKAO TECH')[0]

    cnt = 1
    while True:
        try:
            driver.get(url)
            sleep(10)
        except:
            ERROR_MESSAGE['company'] = kakao.name
            return ERROR_MESSAGE

        posts = CSS_SELECTOR('ul.list_post')
        posts = posts[0].find_elements_by_css_selector('li')
        for post in posts:
            element_selector = post.find_element_by_css_selector

            title = element_selector('strong.tit_post').text
            if Post.objects.filter(company=kakao, title=title):
                return get_contents(kakao)

            date = element_selector('span.txt_date').text
            post_url = element_selector('a.link_post').get_attribute('href')
            try:
                image = element_selector('img').get_attribute('src')
            except:
                image = ''

            Post.objects.get_or_create(
                company=kakao, title=title, contents='', date=date, image=image, url=post_url)

        get_next = CSS_SELECTOR('a.next.page-numbers')
        if get_next:
            cnt += 1
            url = f'https://tech.kakao.com/blog/page/{cnt}/'
        else:
            return get_contents(kakao)
