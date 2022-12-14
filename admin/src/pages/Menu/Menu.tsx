import { useState, useMemo, useEffect, useRef } from 'react';
import usePosts from '../../hooks/queries/usePosts';
import useTerms from '../../hooks/queries/useTerms';
import useMutationTerm from '../../hooks/mutations/useMutationTerm';

import { Accordion, AccordionTab } from 'primereact/accordion';
import { Tree } from 'primereact/tree';
import { Post, Term } from '../../interfaces';
import { Button } from 'primereact/button';
import { diffing, listToTree, recursive } from '../../utils';
import { InputText } from 'primereact/inputtext';
import { ContextMenu } from 'primereact/contextmenu';
import { useForm } from 'react-hook-form';

const Menu = () => {
    const cm = useRef<any | null>(null!);
    const [selectedNodeKey, setSelectedNodeKey] = useState<any>(null);

    const { data: posts } = usePosts();
    const { data: terms } = useTerms();
    const { createTerm, updateMenu, deleteTerm } = useMutationTerm('link');
    const [postsSelected, setPostsSelected] = useState<any>({});
    const [categoriesSelected, setCategoriesSelected] = useState<any>({});
    const [links, setLinks] = useState<any>([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Term>();

    const postsMap: { [key: number]: Post } = useMemo(() => {
        return posts?.data?.reduce((pre: any, currentPost: Post) => {
            return {
                ...pre,
                [currentPost.id]: currentPost,
            };
        }, {});
    }, [posts?.data]);

    const categoriesMap: { [key: number]: Term } = useMemo(() => {
        return terms?.data?.reduce((pre: any, currentTerm: Term) => {
            return {
                ...pre,
                [Number(currentTerm.id)]: currentTerm,
            };
        }, {});
    }, [terms?.data]);

    const postsTree = posts?.data?.map((post: Post) => {
        return {
            ...post,
            key: post.id,
            label: post.title,
        };
    });

    const categories = terms?.data
        .filter((term: Term) => {
            return term.taxonomy === 'category';
        })
        .map((category: Term) => {
            return {
                ...category,
                key: category.id,
                label: category.name,
            };
        });

    const addPostToMenu = () => {
        Object.keys(postsSelected).map((postId: string, index: number) => {
            const postDetail: Post = postsMap[Number(postId)];

            createTerm({
                name: postDetail.title,
                taxonomy: 'link',
                slug: `/post/${postDetail.slug}`,
                linkType: 'post',
                linkValue: postDetail.id,
                linkOrder: links?.length + index + 1,
            });
        });
        setPostsSelected({});
    };

    const addCategoryToMenu = () => {
        Object.keys(categoriesSelected).map((termId: string, index: number) => {
            const categoryDetail: Term = categoriesMap[Number(termId)];

            createTerm({
                name: categoryDetail.name,
                taxonomy: 'link',
                slug: `/category/${categoryDetail.slug}`,
                linkType: 'category',
                linkValue: categoryDetail.id,
                linkOrder: links?.length + index + 1,
            });
        });
        setCategoriesSelected({});
    };

    const addSelfCreatedLink = (data: Term) => {
        createTerm({
            name: data.name,
            taxonomy: 'link',
            linkType: 'self-created',
            linkValue: data.linkValue,
            linkOrder: links?.length + 1,
        });
        reset({});
    };

    useEffect(() => {
        let links = terms?.data
            ?.filter((term: Term) => {
                return term.taxonomy === 'link';
            })
            .map((term: Term) => {
                return {
                    ...term,
                    key: term.id,
                    label: term.name,
                };
            });
        links = listToTree(links || [], true);
        setLinks(links);
    }, [terms?.data]);

    const menu = [
        {
            label: 'C???p nh???t',
            icon: 'pi pi-pencil',
            command: () => {},
        },
        {
            label: 'X??a li??n k???t',
            icon: 'pi pi-trash',
            command: () => {
                deleteTerm(selectedNodeKey);
            },
        },
    ];

    return (
        <div>
            <ContextMenu
                model={menu}
                ref={cm}
                onHide={() => setSelectedNodeKey(null)}
            />

            <div className='grid grid-cols-6 gap-4'>
                <div className='col-span-2 rounded-md bg-white p-7 shadow-lg'>
                    <h4 className='mb-3 text-lg font-bold'>Th??m li??n k???t</h4>

                    <Accordion>
                        {/* <AccordionTab header='Trang'></AccordionTab> */}

                        <AccordionTab header='B??i vi???t'>
                            <Tree
                                className='mt-2 max-h-[280px] overflow-auto'
                                value={postsTree}
                                selectionMode='checkbox'
                                selectionKeys={postsSelected}
                                onSelectionChange={(e) => {
                                    setPostsSelected(e.value);
                                }}
                            />

                            <div className='mt-2 text-right'>
                                <Button
                                    disabled={
                                        Object.keys(postsSelected).length === 0
                                    }
                                    onClick={addPostToMenu}
                                >
                                    Th??m v??o Menu
                                </Button>
                            </div>
                        </AccordionTab>

                        <AccordionTab header='Li??n k???t t??? t???o'>
                            <form onSubmit={handleSubmit(addSelfCreatedLink)}>
                                <div className='mb-4'>
                                    <label
                                        htmlFor='linkValue'
                                        className='block'
                                    >
                                        Li??n k???t URL
                                    </label>

                                    <InputText
                                        id='linkValue'
                                        autoFocus
                                        aria-describedby='name-help'
                                        className='w-full'
                                        {...register('linkValue', {
                                            required: 'Kh??ng ???????c ????? tr???ng',
                                        })}
                                    />

                                    {errors['linkValue'] && (
                                        <small className='p-error'>
                                            {errors['linkValue'].message}
                                        </small>
                                    )}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor='update-name'
                                        className='block'
                                    >
                                        T??n ???????ng d???n
                                    </label>

                                    <InputText
                                        id='update-name'
                                        aria-describedby='name-help'
                                        className='w-full'
                                        {...register('name', {
                                            required: 'Kh??ng ???????c ????? tr???ng',
                                        })}
                                    />

                                    {errors['name'] && (
                                        <small className='p-error'>
                                            {errors['name'].message}
                                        </small>
                                    )}
                                </div>

                                <div className='mt-2 text-right'>
                                    <Button type='submit'>Th??m v??o Menu</Button>
                                </div>
                            </form>
                        </AccordionTab>

                        <AccordionTab header='Chuy??n m???c'>
                            <Tree
                                className='mt-2 max-h-[280px] overflow-auto'
                                value={listToTree(categories || []) || []}
                                selectionMode='checkbox'
                                selectionKeys={categoriesSelected}
                                onSelectionChange={(e) => {
                                    setCategoriesSelected(e.value);
                                }}
                            />

                            <div className='mt-2 text-right'>
                                <Button
                                    disabled={
                                        Object.keys(categoriesSelected)
                                            .length === 0
                                    }
                                    onClick={addCategoryToMenu}
                                >
                                    Th??m v??o Menu
                                </Button>
                            </div>
                        </AccordionTab>
                    </Accordion>
                </div>

                <div className='col-span-4 rounded-md bg-white p-7 shadow-lg'>
                    <h4 className='mb-3 text-lg font-bold'>C???u tr??c Menu</h4>

                    <Tree
                        value={links}
                        dragdropScope='demo'
                        onDragDrop={(event: any) => {
                            const dataUpdate: Term[] = [];

                            diffing(links, event.value, (newValue: Term) => {
                                dataUpdate.push(newValue);
                            });

                            console.log(dataUpdate);
                            updateMenu(dataUpdate);
                        }}
                        nodeTemplate={(node, options) => {
                            return (
                                <span
                                    className={`${options.className} w-[600px] rounded-md border-[1px] p-3`}
                                >
                                    {node.label}
                                </span>
                            );
                        }}
                        contextMenuSelectionKey={selectedNodeKey}
                        onContextMenuSelectionChange={(event) => {
                            setSelectedNodeKey(event.value);
                        }}
                        onContextMenu={(event) => {
                            if (cm?.current) {
                                cm?.current.show(event.originalEvent);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Menu;
