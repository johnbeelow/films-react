import { SideBar } from '../side_bar'
import { FilterSorting } from '../filter_sorting'
import { FilterGenres } from '../filter_genres'
import { FilterYears } from '../filter_years'
import { FilterPagination } from '../filter_pagination'
import { SearchFilms } from '../search_films'

export const FiltersContainer = () => {
  return (
    <SideBar>
      <SearchFilms />
      <FilterSorting />
      <FilterYears />
      <FilterGenres />
      <FilterPagination />
    </SideBar>
  )
}
