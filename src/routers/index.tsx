import React, { lazy } from "react"
import { Navigate } from "react-router-dom"
import Home from "../views/HomeView"


const WordsView = lazy(() => import("../views/WordListView"))
const TestView = lazy(() => import("../views/TestView"))

const loadingView = (comp: JSX.Element) => (<React.Suspense fallback={<div> loading </div>} >{comp}</React.Suspense>
)
const routes = [
    //  嵌套路由 开始-------------------

    {
        path: "/",
        element: <Navigate to="/words" />
    },
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/words",
                element: loadingView(<WordsView />)
            },
            {
                path: "/test",
                element: loadingView(<TestView />)
            },
        ]
    }
]

export default routes