export class AppEndpoints {
    public static ARTWORK = '/artwork/'
    public static ARTWORK_SEARCH = '/artwork/filtered/'
    public static ARTWORK_RATED = '/rating/user/'
    public static ARTWORK_RATED_SEARCH = '/rating/filtered/user/'

    public static RATING = '/rating/'
    public static RATING_OF_ARTWORK = '/rating/artwork/'

    public static ARTLIST = '/art-list/'
    public static ARTLIST_DETAILS = '/art-list/details/'
    public static ARTLIST_SEARCH = '/art-list/filtered/'
    public static ARTLIST_OF_USER = '/art-list/user/'
    public static ARTLIST_TO_EDIT = '/art-list/edit/'
    public static ARTLIST_COVER_IMAGE = '/art-list/cover/'
    public static ADD_TO_LIST_MODAL = '/art-list/modal/'

    public static USER = '/user/'
    public static CREATE_REGULAR_USER = '/user/create-regular-user'
    public static USER_AVAILABLE = '/user/available'
    public static USER_NICKNAME = '/user/nickname/'
    public static USER_ACCOUNT_EXISTS = '/user/acount-exists'

    public static SCRAPING_THYSSEN = '/scraping/thyssen'
    public static SCRAPING_PICASSO = '/scraping/picasso'

    public static LOGIN = '/auth/login'
    public static REFRESH = '/auth/refresh'
}