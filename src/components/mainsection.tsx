import * as React from "react";

export interface MainSectionProps {
	pageName: string;
}

export class MainSection<T = {}> extends React.Component<MainSectionProps, T> {}
