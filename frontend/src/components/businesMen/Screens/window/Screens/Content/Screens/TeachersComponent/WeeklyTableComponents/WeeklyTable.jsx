import { ScheduleComponent,  Inject , Week ,ViewDirective, ViewsDirective , ResourcesDirective , ResourceDirective , Resize , DragAndDrop} from '@syncfusion/ej2-react-schedule'
import React from 'react'

function WeeklyTable() {
    const data = [
        {
          Id: 1,
          Subject: 'Meeting - 1',
          StartTime: new Date(),
          EndTime: new Date(),
          IsAllDay: false
        },
      ];
      const eventSettings = { dataSource: data }
      const generateResourceData = (startId, endId, text) => {
        let data = [];
        let colors = [
          '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c',
          '#fdd835', '#748ffc', '#9775fa', '#df5286', '#7fa900',
          '#fec200', '#5978ee', '#00bdae', '#ea80fc'
        ];
        for (let a = startId; a <= endId; a++) {
          let n = Math.floor(Math.random() * colors.length);
          data.push({
            Id: a,
            Text: text + ' ' + a,
            Color: colors[n]
          });
        }
        return data;
      }
  return (
    <div className='overflow-auto p-2'>
        <ScheduleComponent eventSettings={eventSettings} height={800} readOnly={true} >
            <ResourcesDirective>
                <ResourceDirective  field='ResourceId' title='Resource' name='Resources' allowMultiple={true} dataSource={generateResourceData(1, 300, 'Resource')} textField='Text' idField='Id' colorField='Color'></ResourceDirective>
            </ResourcesDirective>
            <ViewsDirective>
                <ViewDirective option='Week' startHour='06:00' endHour='19:00' />
            </ViewsDirective>
            <Inject services={[Week , Resize , DragAndDrop]}/>
        </ScheduleComponent>
    </div>
  )
}

export default WeeklyTable