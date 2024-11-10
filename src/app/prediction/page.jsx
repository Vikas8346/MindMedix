"use client";
import { useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "../../../lib/utils";

const MedicalForm = () => {
  const { data: session, status: sessionStatus } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const age = e.target.elements.age.value;
    const symptoms = e.target.elements.symptoms.value;
    const medicalHistory = e.target.elements.medicalHistory.value;
    const currentMedications = e.target.elements.currentMedications.value;
    const recentVitalSigns = e.target.elements.recentVitalSigns.value;
    const image = e.target.elements.image.files[0];

    if (
      !name ||
      !age ||
      !symptoms ||
      !medicalHistory ||
      !currentMedications ||
      !recentVitalSigns ||
      !image
    ) {
      console.log("Please fill all the fields");
      return;
    }

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age,
          symptoms,
          medicalHistory,
          currentMedications,
          recentVitalSigns,
          image: image,
        }),
      });
      if (res.status === 400) {
        console.log(error);
      }
      if (res.status === 200) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    session && (
      <div className="bg-[url('/bg.svg')] bg-cover min-h-screen">
        <div className="max-w-xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200">
            Medical Form
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Please provide your medical information
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <LabelInputContainer className="mb-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  type="text"
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" placeholder="30" type="number" />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="symptoms">Symptoms</Label>
              <Input
                id="symptoms"
                name="symptoms"
                placeholder="Describe your symptoms"
                type="text"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Input
                id="medicalHistory"
                name="medicalHistory"
                placeholder="Describe your medical history"
                type="text"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="currentMedications">Current Medications</Label>
              <Input
                id="currentMedications"
                name="currentMedications"
                placeholder="List your current medications"
                type="text"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="recentVitalSigns">Recent Vital Signs</Label>
              <Input
                id="recentVitalSigns"
                name="recentVitalSigns"
                placeholder="Describe your recent vital signs"
                type="text"
              />
            </LabelInputContainer>

            {/* upload imgae */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="image">Upload Image</Label>
              <Input id="image" name="image" type="file" accept="image/*" />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Submit &rarr;
              <BottomGradient />
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default MedicalForm;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
