import React from 'react';

export interface AuthContextType {
    user: any;
    signIn: (user: string, callback: VoidFunction) => void;
    signOut: (callback: VoidFunction) => void;
}

export interface Navigation {
    icon?: React.ReactNode;
    label: string;
    to: string;
}

export interface Term {
    id?: number;
    name: string;
    slug?: string;
    link?: string;
    taxonomy?: string;
    parentId?: number;
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    categories: Array<number>;
    tags: Array<number>;
    thumbnail: string;
    content: string;
}

export interface QueryParam {
    _page?: number;
    _limit?: number;
    _sort?: string;
    _order?: 'asc' | 'desc';
    q?: any;
}

export interface ColumnType {
    field?: string;
    header?: any;
    body?: any;
    style?: any;
}
