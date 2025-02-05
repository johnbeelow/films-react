import { FiltersContainer } from '../../../features/filters/ui/filters_container'
import { FilterSorting } from '../../../features/filters/ui/filter_sorting'
import { FilterGenres } from '../../../features/filters/ui/filter_genres'
import { FilterYears } from '../../../features/filters/ui/filter_years'
import { FilterPagination } from '../../../features/filters/ui/filter_pagination'
import { SearchFilms } from '../../../features/search_films/ui'

export const SideBar = () => {
  return (
    <FiltersContainer>
      <SearchFilms />
      <FilterSorting />
      <FilterYears />
      <FilterGenres />
      <FilterPagination />
    </FiltersContainer>
  )
}
