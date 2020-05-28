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

        div = CSS_SELECTOR('div.con_view')[0]
        articles = div.find_elements_by_css_selector('p')

        contents = ''
        for article in articles:
            contents += article.text + '\n'

        post.contents = contents
        post.save()

    SUCESS_MESSAGE['company'] = company.name
    return SUCESS_MESSAGE


def get_posts(url):
    print('{:=^100}'.format('START CRAWLING NAVER D2'))
    naver = Company.objects.get_or_create(
        name='NAVER D2', url=url, description='NAVER D2')[0]

    cnt = 0
    while True:
        try:
            driver.get(url)
            sleep(10)
        except:
            ERROR_MESSAGE['company'] = naver.name
            return ERROR_MESSAGE

        posts = CSS_SELECTOR('div.cont_post')
        for post in posts:
            element_selector = post.find_element_by_css_selector

            title = element_selector('a').text
            if Post.objects.filter(company=naver, title=title):
                return get_contents(naver)

            date = element_selector('dd').text
            image = element_selector('img').get_attribute('src')
            post_url = element_selector('a').get_attribute('href')

            Post.objects.get_or_create(
                company=naver, title=title, contents='', date=date, image=image, url=post_url)

        get_next = CSS_SELECTOR('a.btn_next')
        if get_next:
            cnt += 1
            url = f'https://d2.naver.com/home?page={cnt}'
        else:
            return get_contents(naver)
