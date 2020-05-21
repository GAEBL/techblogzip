from .config import driver, ERROR_MESSAGE, SUCESS_MESSAGE, CSS_SELECTOR
from mainapp.models import Company, Post
from tqdm import tqdm


def get_contents(company):
    posts = Post.objects.filter(company=company, contents='')
    for post in tqdm(posts):
        try:
            driver.get(post.url)
            driver.implicitly_wait(30)
        except:
            ERROR_MESSAGE['company'] = company.name
            return ERROR_MESSAGE

        div = CSS_SELECTOR('div.post-content')[0]
        articles = div.find_elements_by_css_selector('p')

        contents = ''
        for article in articles:
            contents += article.text + '\n'

        post.contents = contents
        post.save()

    SUCESS_MESSAGE['company'] = company.name
    return SUCESS_MESSAGE


def get_posts(url):
    kakao = Company.objects.get(name='KAKAO TECH')

    cnt = 1
    while True:
        try:
            driver.get(url)
            driver.implicitly_wait(30)
        except:
            ERROR_MESSAGE['company'] = kakao.name
            return ERROR_MESSAGE

        posts = CSS_SELECTOR('ul.list_post')
        posts = posts[0].find_elements_by_css_selector('li')
        for post in posts:
            element_selector = post.find_element_by_css_selector

            title = element_selector('strong.tit_post').text
            if len(Post.objects.filter(company=kakao, title=title)) > 0:
                return get_contents(kakao)

            date = element_selector('span.txt_date').text
            print(date)
            raise
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
