

import { Tabs } from 'antd';
import TheatreList from './ TheatreList';


const Partner = () => {
      const items = [
        {
          key: '1',
          label: 'Theatres',
          children: <TheatreList/>,
        }
        
      ];

    return (
        <>
        <h1>Partner Page</h1>
            <Tabs items={items} />
        </>
    )
}

export default Partner;


