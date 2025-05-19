import Login from '../components/login'

function CustomLogin() {
    return (
        <div className='min-h-screen bg-gray-100 mx-auto rounded-2xl space-y-6'>
            <Login
                onSubmit={async (data) => {
                    console.log('Form submitted:', data)
                }}
            />
        </div>
    )
}
export default CustomLogin