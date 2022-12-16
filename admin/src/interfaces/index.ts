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
    taxonomy?: 'category' | 'tag' | 'link';
    parentId?: number;
    linkType?: 'post' | 'category' | 'self-created' | 'page';
    linkValue?: string | number;
    linkOrder?: number;
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    categories: Array<number>;
    tags: Array<number>;
    thumbnail: string;
    content: string;
    status?: number;
    schedule?: Date | Date[];
}

export interface Comment {
    id: number;
    postId: number;
    name: string;
    email: string;
    content: string;
    allow: boolean;
    createdAt: number;
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
