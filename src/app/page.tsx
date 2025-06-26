import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div 
        className="BACKGROUND inset-0 bg-cover bg-repeat bg-blend-multiply h-screen"
        style={{
          backgroundImage: "url(/hospitalTeam.jpg)",
          backgroundColor: '#add8e6'
        }}
      >
        <div className="HEADER bg-darkBlue flex items-center opacity-80 justify-between pl-5 pr-5">
          <Link href="/">
            <div className="LOGO flex items-center gap-x-2">
              <Image
                src='/logo.png'
                alt="Healio EMS Logo"
                width={64}
                height={64}
              />
              <p className="text-pureWhite text-3xl">Healio EMS</p>
            </div>        
          </Link>
          <div className="BUTTONS flex gap-x-4">
            <Link href="/login">
            <button 
              className="
                border-2
                border-softBlue 
                px-2 py-1 rounded-2xl 
                hover:bg-activeBlue 
                text-pureWhite"
              >
                Login
              </button>
            </Link>
            <Link href="/register">
              <button 
                className="
                border-2 
                border-softBlue 
                px-2 py-1 
                rounded-2xl 
                hover:bg-activeBlue 
                text-pureWhite"
              >
                Register
              </button>
            </Link>
         </div>
        </div>
        <div className="MAIN gap-3 mx-60">
          <div 
            className="
              INTRO 
              justify-center 
              border-1 
              border-softBlue 
              bg-softBlue 
              opacity-80 
              text-center 
              my-5 
              p-5 
              rounded-2xl"
              >
                <h1 className="text-4xl text-softGreen ">Healio EMS - Your Care, Simplified</h1>
                <p className="text-darkGray">Healio is committd to providing you with not just the best nedical care, but aslo the tools to manage your health journey with ease and confidence. Our secure online patient portal is your personal health hub, designed with you at its center. Here, you can take control of your appointments, understand your health on a deeper level by viewing your lab results, and have your complete medical history at your fingertips.</p>
            </div>
            <div className="INFO flex flex-row">
              <div 
                className="
                  SCHEDULE 
                  justify-center 
                  border-1 
                  border-softBlue 
                  bg-softBlue 
                  opacity-80 
                  text-center 
                  my-5 
                  mr-2.5 
                  p-5 
                  rounded-2xl 
                  w-3/5"
                >
                <h1 className="text-3xl text-softGreen">Effortless Appointment Management</h1>
                <p>Take the stress out of scheduling with our intuitive online booking system. Whether you're at home or on the go, managing your hospital appointments is now just a few clicks away.</p>
                <h2 className="text-2xl text-softGreen">With our online appointment system, you can:</h2>
                <ul className="text-darkGray">
                  <li><b>Book New Appointments 24/7:</b> Find a time that works for you without the need to phone. See real-time availability of our specialists and services.</li>
                  <li><b>View Upcoming Visits:</b> Keep track of all your scheduled appointments in one clear, easy-to-read list.</li>
                  <li><b>Reschedule or Cancel with Ease:</b> Life happens. If your plans change, you can easily modify or cancel your appointments online.</li>
                  <li><b>Receive Timely Reminders:</b> Get automated email or text reminders for your upcoming appointments so you never miss a visit.</li>
                </ul>
              </div>
              <span className="flex flex-col ml-2.5 w-1/2">
                <div className="LABTEST justify-center border-1 border-softBlue bg-softBlue opacity-80 text-center  my-5 p-5 rounded-2xl">
                  <h1 className="text-3xl text-softGreen">Your Results, Explained</h1>
                  <p className="text-darkGray">Your medical record is your health story. Our patient portal gives you a comprehensive and secure view of your medical history, ensuring you have the full picture of your health journey.</p>
                </div>
                <div className="LABTEST justify-center border-1 border-softBlue bg-softBlue opacity-80 text-center my-5 p-5 rounded-2xl">
                  <h1 className="text-3xl text-softGreen">Your Health History, All in One Place</h1>
                  <p className="text-darkGray">Your medical record is your health story. Our patient portal gives you a comprehensive and secure view of your medical history, ensuring you have the full picture of your health journey.</p>
                </div>  
              </span>
            </div>
        </div>
      </div>
    </main>
  );
}
