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

        div = CSS_SELECTOR('div.tui-editor-contents')[0]
        articles = div.find_elements_by_css_selector('h1')
        articles += div.find_elements_by_css_selector('h2')
        articles += div.find_elements_by_css_selector('h3')
        articles += div.find_elements_by_css_selector('p')

        contents = ''
        for article in articles:
            if not article.find_elements_by_css_selector('code'):
                contents += article.text + ' '

        post.contents = contents
        post.save()

    SUCESS_MESSAGE['company'] = company.name
    return SUCESS_MESSAGE


def get_posts(url):
    print('{:=^100}'.format('START CRAWLING TOAST'))
    toast = Company.objects.get_or_create(
        name='TOAST', url=url, description='TOAST')[0]

    cnt = 1
    while True:
        try:
            driver.get(url)
            sleep(10)
        except:
            ERROR_MESSAGE['company'] = toast.name
            return ERROR_MESSAGE

        posts = CSS_SELECTOR('a.lst_link')
        for post in posts:
            element_selector = post.find_element_by_css_selector

            title = element_selector('h3.tit.ng-binding').text
            if Post.objects.filter(company=toast, title=title):
                return get_contents(toast)

            date = element_selector('span.date.ng-binding').text.split(' ')[1]

            image = element_selector(
                'span.img_area.ng-scope').get_attribute('style')
            image = image.lstrip('background-image: url("').rstrip('");')
            post_url = post.get_attribute('href')

            Post.objects.get_or_create(
                company=toast, title=title, contents='', date=date, image=image, url=post_url)

        get_next = CSS_SELECTOR('a.tui-page-btn.tui-next')
        if get_next:
            cnt += 1
            url = f'https://meetup.toast.com/?page={cnt}'
        else:
            return get_contents(toast)
