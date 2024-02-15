import AddCarForm from "@/components/forms/add-car"

const page = async () => {

  return (
    <section className='md:px-16'>
      <main className='md:mx-16 my-4 p-3 bg-white'>

        <AddCarForm />

      </main>
    </section>
  )
}

export default page