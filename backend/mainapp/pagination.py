from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

class CustomPagination(LimitOffsetPagination):
    page_size = 10
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        return Response(OrderedDict([
             ('lastPage', self.page.paginator.count),
             ('countItemsOnPage', self.page_size),
             ('current', self.page.number),
             ('next', self.get_next_link()),
             ('previous', self.get_previous_link()),
             ('results', data)
         ]))
