from .config import options, driver
from mainapp.models import Company, Post
import json

driver_selector = driver.find_elements_by_css_selector
naver = Company.objects.get(name='네이버')


def get_posts(url):
    cnt = 0
    while True:
        try:
            driver.get(url)
            driver.implicitly_wait(10)
        except:
            return {'status': 500, 'message': 'Crawling을 할 수 없습니다. 해당 페이지의 주소와 서버 상태를 확인하세요.'}
        else:
            posts = driver_selector('div.cont_post')
            for post in posts:
                element_selector = post.find_element_by_css_selector

                title = element_selector('a').text
                date = element_selector('dd').text
                contents = element_selector('div.post_txt').text
                image = element_selector('img').get_attribute('src')
                url = element_selector('a').get_attribute('href')

                _, is_created = Post.objects.get_or_create(
                    company=naver, title=title, contents=contents, date=date,
                    image=image, url=url
                )

            is_ended = len(driver_selector('a.btn_next')) == 0
            if is_ended == False:
                cnt += 1
                url = f'https://d2.naver.com/home?page={cnt}'
            else:
                return {'status': 200, 'message': 'Naver D2에 대한 Crawling을 완료했습니다.'}
