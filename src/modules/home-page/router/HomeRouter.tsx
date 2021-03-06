import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { routes } from 'src/common/globals/routes/routes';
import { IAuthState, IRootState } from 'src/common/state/reducers/IState';
import { HomePage } from 'src/modules/home-page/components/HomePage';

interface IProps {
    auth: IAuthState;
}

/**
 *
 *
 * @class HomeRouter
 * @extends {React.Component}
 */
const HomeRouterBase = ({ auth }: IProps) => {
    const renderContent = () => {
        if (auth && (auth.roles.includes('Home') || auth.roles.includes('Admin') || auth.roles.includes('Owner'))) {
            return (
                <Switch>
                    <Route exact={true} path={routes.home.home} component={HomePage} />
                    <Redirect to={routes.home.home} />
                </Switch>
            );
        } else {
            return (
                <Switch>
                    <Redirect to={routes.league.home} />
                </Switch>
            );
        }
    };

    return (
        <div>
            <div style={{ textAlign: 'center' }}>{renderContent()}</div>
        </div>
    );
};

const mapStateToProps = ({ auth }: IRootState) => {
    return { auth };
};

const HomeRouter = connect(mapStateToProps)(HomeRouterBase);

export { HomeRouter };
