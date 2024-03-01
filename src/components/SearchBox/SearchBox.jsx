import { useId } from 'react';
import { selectFilter } from '../../redux/selectors';
import { changeFilter } from '../../redux/filtersSlice';
import css from './SearchBox.module.css';
import { useSelector, useDispatch } from 'react-redux';

export const SearchBox = () => {
  const searchBoxId = useId();
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <div className={css.searchBox}>
      <label htmlFor={searchBoxId}>
        Find contacts by name{<br />}
        <input
          className={css.input}
          type="text"
          id={searchBoxId}
          name="filter"
          value={filter}
          onChange={event => dispatch(changeFilter(event.target.value))}
        />
      </label>
    </div>
  );
};
