import { Outlet } from 'react-router-dom';
import { Content, Header, SideBar } from './layouts';
import navigations from './navigations';

function App() {
    return (
        <div>
            <Header />

            <SideBar navigations={navigations} />

            <Content>
                <Outlet />
            </Content>
        </div>
    );
}

export default App;
