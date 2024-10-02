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
    const [dataSource, setDataSource] = useState<DataType[]>([]);  // 当前数据
    const [originalData, setOriginalData] = useState<DataType[]>([]);  // 原始数据，用于对比
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
        setOriginalData(dataWithKey);  // 保存加载时的原始数据，用于后续比较
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

    // 处理按钮点击事件，只打印修改过的 `typ` 和 `lvl` 值
    const handleButtonClick = async () => {
        // 过滤出修改过的行（与原始数据不同的行）
        const modifiedData = dataSource.filter((item, index) => {
            const originalItem = originalData[index];
            return item.typ !== originalItem.typ || item.lvl !== originalItem.lvl;
        });

        if (modifiedData.length === 0) {
            console.log("No data modified.");
            return;
        }
        // 只打印修改过的项目
        console.log("Modified radio and rate selections:", modifiedData.map(item => ({ word: item.word, freq: item.freq, typ: item.typ, lvl: item.lvl })));
        // 将修改过的数据发送到 API
        try {
            const result = await WordListBulkAPI(modifiedData);  // 假设 WordListBulkAPI 是批量更新的 API

            // 更新成功后，重新加载数据，传入之前的查询参数
            await loadData(params);  // 重新加载数据，保持之前的查询条件
            console.log("Data reloaded after successful update.");

        } catch (error) {
            console.error("Error sending modified data to API:", error);
        }

    };

    return (
        <div>
            <SelectView onSubmit={handleFormSubmit} />
            <Table dataSource={dataSource} columns={columns(onRadioChange, onRateChange)} />
            <Button type="primary" onClick={handleButtonClick} style={{ marginTop: 16 }}>
                打印修改过的数据
            </Button>
        </div>
    );
};

export default View;
