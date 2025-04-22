package filters

import javax.inject._
import play.api.http.DefaultHttpFilters
import play.filters.headers.SecurityHeadersFilter

@Singleton
class Filters @Inject()(securityHeadersFilter: SecurityHeadersFilter)
  extends DefaultHttpFilters(securityHeadersFilter)
