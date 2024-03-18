import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { Route } from 'react-router-dom';
import SearchHeader from '../SearchHeader';
import { withRouter } from '../../tests/utils';

describe('SearchHeader', () => {
  // 정적 UI 스냅샷 테스트
  it('renders correctly ', () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<SearchHeader />} />)
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  // bts 검색 시 input에 bts 표기가 되는지, 뒤로가기 앞으로 가기 시 input 값 유지되는지
  it('renders with keyword correctly ', async () => {
    render(
      withRouter(<Route path="/:keyword" element={<SearchHeader />} />, '/bts')
    );
    expect(screen.getByDisplayValue('bts')).toBeInTheDocument();
  });

  // 임의로 설정한 fake-keyword로 엘리먼트 설정하고 그 text가 화면에 보여지는지 테스트
  it('navigates to results page on search button click', () => {
    const searchKeyword = 'fake-keyword';

    render(
      withRouter(
        <>
          <Route path="/home" element={<SearchHeader />} />
          <Route
            path={`/videos/${searchKeyword}`}
            element={<p>{`Search result for ${searchKeyword}`}</p>}
          />
        </>,
        '/home'
      )
    );

    const searchButton = screen.getByRole('button');
    const searchInput = screen.getByRole('textbox');

    userEvent.type(searchInput, searchKeyword);
    userEvent.click(searchButton);

    expect(
      screen.getByText(`Search result for ${searchKeyword}`)
    ).toBeInTheDocument();
  });
});
