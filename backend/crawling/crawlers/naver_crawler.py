from .config import options, driver
import json

driver_selector = driver.find_elements_by_css_selector


def get_posts(url):
    data, cnt = [], 0
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
                data.append(
                    {
                        'title': element_selector('a').text,
                        'contents': element_selector('div.post_txt').text,
                        'image': element_selector('img').get_attribute('src'),
                        'url': element_selector('a').get_attribute('href')
                    }
                )
            is_ended = len(driver_selector('a.btn_next')) == 0
            if is_ended == False:
                cnt += 1
                url = f'https://d2.naver.com/home?page={cnt + 1}'
            else:
                # 주의: 여기에 이제 모델에 저장할 로직, 해당 URL로 이동해서 전체 문서 내용을 가져올 로직 필요
                return {'status': 200, 'message': 'Naver D2에 대한 Crawling을 완료했습니다.'}
