import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import Intervals from "./Intervals"
import StatisticPage from "./StatisticPage"

export default () => {
    return <Switch>
        <Route exact path="/stats/intervals/:address">
            <Intervals />
        </Route>
        <Route exact path="/stats/networks">
            <StatisticPage />
        </Route>
        <Route exact path="/stats">
            <Redirect to="/stats/networks"></Redirect>
        </Route>
    </Switch>
}