import Brend from './svg/Brend'

function MainBar() {
        return (
        <div className='w-100'>
            <div className='d-flex align-items-center p-2 px-3' style={{gap:10}}>
                <Brend />
                <span className='p-2' style={{fontSize:18 , fontWeight:500 , fontFamily:"sans-serif"}}>
                    The-edu
                </span>
            </div>
        </div>
    )
}

export default MainBar