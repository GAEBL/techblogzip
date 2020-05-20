from .config import driver, ERROR_MESSAGE, SUCESS_MESSAGE, CSS_SELECTOR
from mainapp.models import Company, Post
from tqdm import tqdm


def get_contents(company):
    posts = Post.objects.filter(company=company)
    for post in tqdm(posts):
        try:
            driver.get(post.url)
            driver.implicitly_wait(30)
        except:
            ERROR_MESSAGE['company'] = company.name
            return ERROR_MESSAGE

        div = CSS_SELECTOR('section.post-content')[0]
        articles = div.find_elements_by_css_selector('p')
        try:
            image = CSS_SELECTOR(
                'header.post-head')[0].get_attribute('style').split('url("')[1][:-3]
            image = 'https://yanolja.github.io' + image
        except:
            image = ''

        contents = ''
        for article in articles:
            contents += article.text + '\n'

        post.contents = contents
        post.image = image
        post.save()

    SUCESS_MESSAGE['company'] = company.name
    return SUCESS_MESSAGE


def get_posts(url):
    yanolja = Company.objects.get(name='YANOLJA')

    cnt = 1
    while True:
        try:
            driver.get(url)
            driver.implicitly_wait(30)
        except:
            ERROR_MESSAGE['company'] = yanolja.name
            return ERROR_MESSAGE

        posts = CSS_SELECTOR('article.post')
        for post in posts:
            element_selector = post.find_element_by_css_selector

            title = element_selector('h2.post-title').text
            if Post.objects.filter(company=yanolja, title=title):
                return get_contents(yanolja)

            date = element_selector(
                'time.post-date').get_attribute('datetime').replace('-', '.')
            post_url = element_selector('a').get_attribute('href')

            Post.objects.get_or_create(
                company=yanolja, title=title, contents='', date=date, image='', url=post_url)

        get_next = CSS_SELECTOR('a.older-posts')
        if get_next:
            cnt += 1
            url = f'{url}page{cnt}/'
        else:
            break

    return get_contents(yanolja)
