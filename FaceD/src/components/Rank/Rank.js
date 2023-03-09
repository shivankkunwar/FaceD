import React from 'react';

const Rank=({ name, entries })=>{
    return (
      <div >
            <div className='Black  f3'>
                   { `Hi! ${name}, You've attempted FACE detection `}
            </div>
            <div className='f1'>
                    {` ${entries} times `}
            </div>
        </div>
    );
}
export default Rank;