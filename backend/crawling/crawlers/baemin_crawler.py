from .config import options, driver
from mainapp.models import Company, Post
from datetime import datetime
from tqdm import tqdm
import json

driver_selector = driver.find_elements_by_css_selector
baemin = Company.objects.get(name='우아한형제들')


def get_contents():
    posts = Post.objects.filter(company=baemin, contents='')
    for post in tqdm(posts):
        driver.get(post.url)
        driver.implicitly_wait(10)

        contents = driver_selector('div.post-content')[0]
        articles = contents.find_elements_by_css_selector('p')

        try:
            image = contents.find_elements_by_css_selector(
                'img'
            )[0].get_attribute('src')
        except:
            image = ''

        contents = ''
        for article in articles:
            contents += article.text + '\n'

        post.contents = contents
        post.image = image
        post.save()


def get_posts(url):
    global driver_selector, baemin

    cnt = 0
    while True:
        try:
            driver.get(url)
            driver.implicitly_wait(10)
        except:
            return {'status': 500, 'message': 'Crawling을 할 수 없습니다. 해당 페이지의 주소와 서버 상태를 확인하세요.'}
        else:
            posts = driver_selector('div.list-module')
            for post in posts:
                element_selector = post.find_element_by_css_selector

                title = element_selector('h2.post-link').text
                if len(Post.objects.filter(company=baemin, title=title)) > 0:
                    get_contents()
                    return {'status': 200, 'message': '우아한형제들에 대한 Crawling을 완료했습니다.'}

                date = element_selector('span.post-meta').text.split(' , ')[0]
                date = datetime.strftime(
                    datetime.strptime(date, '%b %d, %Y'), '%Y.%m.%d'
                )
                url = element_selector('a').get_attribute('href')

                _, is_created = Post.objects.get_or_create(
                    company=baemin, title=title, contents='', date=date,
                    image='', url=url
                )

            get_contents()
            return {'status': 200, 'message': '우아한형제들에 대한 Crawling을 완료했습니다.'}
