const Newsletter = () => {
  return (
    <section className='bg-light-white py-14'>
      <div className='max-container w-full'>
        <div className='max-w-[580px] mx-auto text-center'>
          <h3 className='text-3xl font-medium text-brown-50 mb-5'>
            Get the Good Stuff
          </h3>
          <p className='text-lg mb-5'>
            Sign up for our updates and newsletter and get a code for{' '}
            <b className='text-brown-80'>10% OFF </b>
            your first order.
          </p>
          <div className='w-full flex items-center gap-2'>
            <input
              type='text'
              placeholder='Enter your valid email'
              className='h-[50px] py-3 px-4 outline-none border-brown-50 bg-white block shadow-lg flex-1'
            />
            <button className='btn-primary shadow-lg'>Submit</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
