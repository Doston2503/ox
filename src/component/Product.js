import React, {useEffect, useState, useRef} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {SearchOutlined} from '@ant-design/icons';
import {Button, Input, Space, Table} from 'antd';
import Highlighter from 'react-highlight-words';


async function getProducts(setProducts) {
    const token = localStorage.getItem('token');
    const form = new FormData();
    form.set('size', 10);
    form.set('page', 1);

    try {
        let products = [];
        const res = await axios({
            method: 'get',
            url: `https://toko.ox-sys.com/variations`,
            data: form,
            headers: {
                contentType: 'application/json',
                Authorization: `Bearer ${token}`,
                accept: ' application/json'
            }
        });
        const arr = res?.data.items;
        if (arr.length) {
            arr.forEach((item, index) => {
                const obj = {
                    index: index + 1,
                    ...item
                };
                products.push(obj);
            })
        }

        setProducts(products)
    } catch (e) {
        toast.error(e.message)
    }
}

function Product(props) {
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            key: 'index',
            width: '20%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: '20%',
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            width: '20%',
        },
        {
            title: 'Sku',
            dataIndex: 'sku',
            key: 'sku',
            width: '20%',
        },
    ];

    useEffect(() => {
        getProducts(setProducts);
    }, []);

    return (
        <div className="container">
            <Table columns={columns} dataSource={products} rowKey="id"/>
        </div>
    );
}

export default Product;