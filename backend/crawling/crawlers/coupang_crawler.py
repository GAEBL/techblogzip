from .config import driver
from mainapp.models import Company, Post
from datetime import datetime
from tqdm import tqdm
import time


def get_contents(driver_selector, coupang):
    posts = Post.objects.filter(company=coupang, contents='')
    for post in tqdm(posts):
        driver.get(post.url)
        time.sleep(10)

        contents, articles = '', driver_selector('p')
        for article in articles:
            contents += article.text + '\n'

        post.contents = contents
        post.save()


def get_posts(url):
    driver_selector = driver.find_elements_by_css_selector
    coupang = Company.objects.get(name='COUPANG TECH')

    while True:
        try:
            driver.get(url)
            time.sleep(10)
        except:
            return {'status': 500, 'message': 'Crawling을 할 수 없습니다. 해당 페이지의 주소와 서버 상태를 확인하세요.'}
        else:
            posts = driver_selector('div.col.js-trackPostPresentation')
            for post in posts:
                element_selector = post.find_element_by_css_selector

                title = element_selector('div.u-letterSpacingTight').text
                if len(Post.objects.filter(company=coupang, title=title)) > 0:
                    get_contents(driver_selector, coupang)
                    return {'status': 200, 'message': 'COUPANG TECH에 대한 Crawling을 완료했습니다.'}

                date = element_selector('time').get_attribute(
                    'datetime'
                ).split('T')[0]
                date = datetime.strftime(
                    datetime.strptime(date, '%Y-%m-%d'), '%Y.%m.%d'
                )

                image = element_selector(
                    'a.u-block'
                ).get_attribute('style').split('("')[1].split('")')[0]
                url = element_selector('a').get_attribute('href')

                _, is_created = Post.objects.get_or_create(
                    company=coupang, title=title, contents='', date=date,
                    image=image, url=url
                )

            get_contents(driver_selector, coupang)
            return {'status': 200, 'message': 'COUPANG TECH에 대한 Crawling을 완료했습니다.'}
