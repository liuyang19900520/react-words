import { Breadcrumb, Table } from 'antd';
import SelectView from '../components/wrods/WordListSelect.tsx'

const dataSource = [
    {
        key: '1',
        word: 'test',
        freq: 32,
        typ: '3',
        lvl: '1',
    }, {
        key: '2',
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
    },
    {
        title: '标识',
        dataIndex: 'lvl',
        key: 'lvl',
    },
];
const View = () => {
    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <SelectView />
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    )
}

export default View