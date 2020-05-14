from .config import options, driver
from mainapp.models import Company, Post
from tqdm import tqdm
import json

driver_selector = driver.find_elements_by_css_selector
kakao = Company.objects.get(name='카카오')


def get_contents():
    posts = Post.objects.filter(company=kakao, contents='')
    for post in tqdm(posts):
        driver.get(post.url)
        driver.implicitly_wait(10)

        contents = driver_selector('div.post-content')[0]
        articles = contents.find_elements_by_css_selector('p')

        contents = ''
        for article in articles:
            contents += article.text + '\n'

        post.contents = contents
        post.save()


def get_posts(url):
    cnt = 1
    while True:
        try:
            driver.get(url)
            driver.implicitly_wait(10)
        except:
            return {'status': 500, 'message': 'Crawling을 할 수 없습니다. 해당 페이지의 주소와 서버 상태를 확인하세요.'}
        else:
            posts = driver_selector('ul.list_post')
            posts = posts[0].find_elements_by_css_selector('li')
            for post in posts:
                element_selector = post.find_element_by_css_selector

                title = element_selector('strong.tit_post').text
                if len(Post.objects.filter(company=kakao, title=title)) > 0:
                    get_contents()
                    return {'status': 200, 'message': '카카오에 대한 Crawling을 완료했습니다.'}

                date = element_selector('span.txt_date').text
                url = element_selector('a.link_post').get_attribute('href')
                try:
                    image = element_selector('img').get_attribute('src')
                except:
                    image = ''

                _, is_created = Post.objects.get_or_create(
                    company=kakao, title=title, contents='', date=date,
                    image=image, url=url
                )

            is_ended = len(driver_selector('a.next.page-numbers')) == 0
            if is_ended == False:
                cnt += 1
                url = f'https://tech.kakao.com/blog/page/{cnt}/'
            else:
                get_contents()
                return {'status': 200, 'message': '카카오에 대한 Crawling을 완료했습니다.'}
