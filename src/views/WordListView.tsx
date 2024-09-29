import { Breadcrumb, Checkbox, Rate, Table } from 'antd';
import SelectView from '../components/wrods/WordListSelect.tsx'
import { WordListAPI } from "@/requests/api"
import React, { useEffect, useState } from 'react';


const dataSource = [
    {
        word: 'test',
        freq: 32,
        typ: '3',
        lvl: '1',
    }, {
        word: 'question',
        freq: 12,
        typ: '3',
        lvl: '1',
    },

];

const columns = [
    {
        title: '单词',
        dataIndex: 'word',
        key: 'word',
    },
    {
        title: '频率',
        dataIndex: 'freq',
        key: 'freq',
    },
    {
        title: '类别',
        dataIndex: 'typ',
        key: 'typ',
        render: (typ) => (
            <>
                <Checkbox checked={typ === '1'}>生词</Checkbox>
                <Checkbox checked={typ === '2'}>单词量</Checkbox>
                <Checkbox checked={typ === '3'}>无效</Checkbox>
                <Checkbox checked={typ === '4'}>生僻</Checkbox>
            </>
        ),
    },
    {
        title: '标识',
        dataIndex: 'lvl',
        key: 'lvl',
        render: (lvl) => (
            <>
                <Rate disabled value={Number(lvl)} count={3} />
            </>
        ),
    },
];
const View = () => {

    const [dataSource, setDataSource] = useState([]);  // 初始化数据为空数组
    const [params, setParams] = useState([]);  // 初始化数据为空数组


    // 定义处理表单提交的回调函数
    const handleFormSubmit = (values) => {
        // 接收到来自子组件的表单数据
        console.log("Form data from child component:", values);
        setParams(values);
        loadData();
    };

    const loadData = async () => {
        const wordListAPIRes = await WordListAPI(params);
        console.log(wordListAPIRes)
        // 为每条数据生成一个唯一的 key（基于索引）
        const dataWithKey = wordListAPIRes.map((item, index) => ({
            ...item,    // 保留原始数据
            key: index  // 使用索引作为 key
        }));

        setDataSource(dataWithKey); // 设置返回的数据到dataSource
    }

    // 使用 useEffect 来确保只在组件挂载时执行一次数据加载
    // useEffect(() => {
    //     loadData();
    // }, []);  // 空依赖数组，确保只在初次渲染时加载数据
    return (
        <div>
            <SelectView onSubmit={handleFormSubmit} />
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    )
}

export default View