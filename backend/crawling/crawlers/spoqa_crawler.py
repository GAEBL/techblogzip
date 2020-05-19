from .config import driver
from mainapp.models import Company, Post
from datetime import datetime
from tqdm import tqdm
import time


def get_contents(driver_selector, spoqa):
    posts = Post.objects.filter(company=spoqa, contents='')
    for post in tqdm(posts):
        driver.get(post.url)
        time.sleep(10)

        contents = driver_selector('div.post')[0]
        articles = contents.find_elements_by_css_selector('p')

        try:
            image = contents.find_element_by_css_selector(
                'img'
            ).get_attribute('src')
        except:
            image = ''

        contents = ''
        for article in articles:
            contents += article.text + '\n'

        post.contents = contents
        post.image = image
        post.save()


def get_posts(url):
    driver_selector = driver.find_elements_by_css_selector
    spoqa = Company.objects.get(name='SPOQA')

    get_contents(driver_selector, spoqa)
    return {'status': 200, 'message': 'SPOQA에 대한 Crawling을 완료했습니다.'}

    cnt = 1
    while True:
        driver.get(url)
        time.sleep(10)

        is_errored = driver_selector('h1')
        if len(is_errored) > 0:
            if is_errored[0].text == '404':
                get_contents(driver_selector, spoqa)
                return {'status': 200, 'message': 'SPOQA에 대한 Crawling을 완료했습니다.'}

        posts = driver_selector('li.post-item')
        for post in posts:
            element_selector = post.find_element_by_css_selector

            title = element_selector('span.post-title-words').text
            if len(Post.objects.filter(company=spoqa, title=title)) > 0:
                get_contents(driver_selector, spoqa)
                return {'status': 200, 'message': 'SPOQA에 대한 Crawling을 완료했습니다.'}

            date = element_selector('span.post-date').text
            date = datetime.strftime(
                datetime.strptime(date, '%Y년 %m월 %d일'), '%Y.%m.%d'
            )
            url = element_selector('a').get_attribute('href')

            _, is_created = Post.objects.get_or_create(
                company=spoqa, title=title, contents='', date=date,
                image='', url=url
            )

        is_ended = len(driver_selector('p.next')) == 0
        if is_ended == False:
            cnt += 1
            url = f'https://spoqa.github.io/page{cnt}/'
