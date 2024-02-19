import { RouteProps } from 'react-router-dom';
import { StartPage } from 'pages/StartPage';
import { QuestionPage } from 'pages/QuestionPage';
import { ResultPage } from 'pages/ResultPage';

export enum AppRoutes {
    Start = 'start',
    Question = 'question',
    Result = 'result',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.Start]: '/',
    [AppRoutes.Question]: '/question',
    [AppRoutes.Result]: '/results',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.Start]: {
        path: RoutePath.start,
        element: <StartPage />,
    },
    [AppRoutes.Question]: {
        path: RoutePath.question,
        element: <QuestionPage />,
    },
    [AppRoutes.Result]: {
        path: RoutePath.result,
        element: <ResultPage />,
    },
};