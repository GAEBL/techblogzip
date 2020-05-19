from .config import driver
from mainapp.models import Company, Post
from tqdm import tqdm
import time


def get_contents(driver_selector, naver):
    posts = Post.objects.filter(company=naver, contents='')
    for post in tqdm(posts):
        driver.get(post.url)
        time.sleep(10)

        contents = driver_selector('div.con_view')[0]
        articles = contents.find_elements_by_css_selector('p')

        contents = ''
        for article in articles:
            contents += article.text + '\n'

        post.contents = contents
        post.save()


def get_posts(url):
    driver_selector = driver.find_elements_by_css_selector
    naver = Company.objects.get(name='NAVER D2')

    cnt = 0
    while True:
        try:
            driver.get(url)
            time.sleep(10)
        except:
            return {'status': 500, 'message': 'Crawling을 할 수 없습니다. 해당 페이지의 주소와 서버 상태를 확인하세요.'}
        else:
            posts = driver_selector('div.cont_post')
            for post in posts:
                element_selector = post.find_element_by_css_selector

                title = element_selector('a').text
                if len(Post.objects.filter(company=naver, title=title)) > 0:
                    get_contents(driver_selector, naver)
                    return {'status': 200, 'message': 'NAVER D2에 대한 Crawling을 완료했습니다.'}

                date = element_selector('dd').text
                image = element_selector('img').get_attribute('src')
                url = element_selector('a').get_attribute('href')

                _, is_created = Post.objects.get_or_create(
                    company=naver, title=title, contents='', date=date,
                    image=image, url=url
                )

            is_ended = len(driver_selector('a.btn_next')) == 0
            if is_ended == False:
                cnt += 1
                url = f'https://d2.naver.com/home?page={cnt}'
            else:
                get_contents(driver_selector, naver)
                return {'status': 200, 'message': 'NAVER D2에 대한 Crawling을 완료했습니다.'}
