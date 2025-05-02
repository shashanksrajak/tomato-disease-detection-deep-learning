import Footer from "./_components/footer";
import Image from "next/image";
import TomatoDiseaseForm from "./_components/tomato-disease-form";

export default async function Home() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-8 pb-20 min-h-screen flex flex-col justify-between">
      <main className="bg-white shadow-md rounded-lg p-8">
        <div>
          <div className="flex justify-center mb-4 animate-bounce">
            <Image
              aria-hidden
              src="/tomato.png" // Note: You may want to replace this with a tomato image
              alt="Tomato leaf icon"
              width={100}
              height={100}
            />
          </div>
          <h1 className="font-semibold text-3xl text-center">
            Tomato Leaf Disease Detection
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            This application uses machine learning to detect diseases in tomato
            plants from leaf images. Upload a photo of your tomato plant leaf to
            get an instant diagnosis and help with crop management.
          </p>
          <p className="font-semibold text-sm text-center">
            Types of diseases include: Bacterial spot, Early blight, Late
            blight, Mosaic virus.
          </p>
          <hr className="my-4" />

          <TomatoDiseaseForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
