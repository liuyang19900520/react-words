import { Radio, Rate, Table, Button } from 'antd';
import SelectView from '../components/wrods/WordListSelect';
import { WordListAPI, WordListBulkAPI } from "@/requests/api";
import React, { useState } from 'react';

interface DataType {
    key: number;
    word: string;
    freq: number;
    typ: string;
    lvl: string;
}

// 表格列的定义，绑定 `onRadioChange` 和 `onRateChange` 回调
const columns = (
    onRadioChange: (value: string, record: DataType) => void,
    onRateChange: (value: number, record: DataType) => void
) => [
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
            render: (typ: string, record: DataType) => (
                <Radio.Group
                    options={[
                        { label: '生词', value: '1' },
                        { label: '单词量', value: '2' },
                        { label: '无效', value: '3' },
                        { label: '生僻', value: '4' },
                    ]}
                    value={typ} // Radio 单选时只接受一个值
                    onChange={(e) => onRadioChange(e.target.value, record)} // 处理用户选择
                    optionType="button"  // 将 Radio 显示为按钮
                />
            ),
        },
        {
            title: '标识',
            dataIndex: 'lvl',
            key: 'lvl',
            render: (lvl: string, record: DataType) => (
                <Rate value={Number(lvl)} count={3} onChange={(value) => onRateChange(value, record)} />
            ),
        },
    ];

const View: React.FC = () => {
    const [dataSource, setDataSource] = useState<DataType[]>([]);  // 初始化数据为空数组
    const [params, setParams] = useState<any>({});  // 初始化查询参数为空对象

    // 处理表单提交
    const handleFormSubmit = (values: any) => {
        setParams(values);
        loadData(values);
    };

    // 加载数据
    const loadData = async (params: any) => {
        const wordListAPIRes = await WordListAPI(params);
        const dataWithKey = wordListAPIRes.map((item: DataType, index: number) => ({
            ...item,    // 保留原始数据
            key: index  // 使用索引作为 key
        }));
        setDataSource(dataWithKey);
    };

    // 处理 `Radio` 的变化，更新 `dataSource`
    const onRadioChange = (value: string, record: DataType) => {
        const newData = dataSource.map(item =>
            item.key === record.key ? { ...item, typ: value } : item
        );
        setDataSource(newData);
    };

    // 处理 `Rate` 的变化，更新 `dataSource`
    const onRateChange = (value: number, record: DataType) => {
        const newData = dataSource.map(item =>
            item.key === record.key ? { ...item, lvl: value.toString() } : item
        );
        setDataSource(newData);
    };

    // 处理按钮点击事件，打印所有行的 `typ` 和 `lvl` 值
    const handleButtonClick = () => {
        console.log("Current radio and rate selections:", dataSource.map(item => ({ word: item.word, freq: item.freq, typ: item.typ, lvl: item.lvl })));

    };

    return (
        <div>
            <SelectView onSubmit={handleFormSubmit} />
            <Table dataSource={dataSource} columns={columns(onRadioChange, onRateChange)} />
            <Button type="primary" onClick={handleButtonClick} style={{ marginTop: 16 }}>
                打印 Radio 和 Rate 值
            </Button>
        </div>
    );
};

export default View;
