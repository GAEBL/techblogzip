from .config import driver
from mainapp.models import Company, Post
from tqdm import tqdm
import time


def get_contents(driver_selector, yanolja):
    posts = Post.objects.filter(company=yanolja, contents='')
    for post in tqdm(posts):
        driver.get(post.url)
        time.sleep(10)

        contents = driver_selector('section.post-content')[0]
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
    yanolja = Company.objects.get(name='YANOLJA')

    cnt = 1
    while True:
        driver.get(url)
        time.sleep(10)

        posts = driver_selector('article.post')
        for post in posts:
            element_selector = post.find_element_by_css_selector

            title = element_selector('h2.post-title').text
            if len(Post.objects.filter(company=yanolja, title=title)) > 0:
                get_contents(driver_selector, yanolja)
                return {'status': 200, 'message': 'YANOLJA에 대한 Crawling을 완료했습니다.'}

            date = element_selector(
                'time.post-date'
            ).get_attribute('datetime').replace('-', '.')
            url = element_selector('a').get_attribute('href')

            _, is_created = Post.objects.get_or_create(
                company=yanolja, title=title, contents='', date=date,
                image='', url=url
            )

        is_ended = len(driver_selector('a.older-posts')) == 0
        if is_ended == False:
            cnt += 1
            url = f'https://yanolja.github.io/page{cnt}/'
        else:
            break

    get_contents(driver_selector, yanolja)
    return {'status': 200, 'message': 'YANOLJA에 대한 Crawling을 완료했습니다.'}
