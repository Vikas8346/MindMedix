"use client";
import { useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "../../../lib/utils";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const MedicalForm = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.elements.name.value);
    formData.append("age", e.target.elements.age.value);
    formData.append("symptoms", e.target.elements.symptoms.value);
    formData.append("medicalHistory", e.target.elements.medicalHistory.value);
    formData.append(
      "currentMedications",
      e.target.elements.currentMedications.value
    );
    formData.append(
      "recentVitalSigns",
      e.target.elements.recentVitalSigns.value
    );
    formData.append("image", e.target.elements.image.files[0]);

    if ([...formData.values()].includes("")) {
      console.log("Please fill all the fields");
      return;
    }

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      if (res.status === 400) {
        console.log("Error");
      } else if (res.status === 200) {
        const data = await res.json();
        setResult(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  if (!session) {
    redirect("/auth/login");
  }

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  // useEffect(() => {
  //   const dummyResult = {
  //     diagnosis_details:
  //       "John Doe is a 65-year-old male experiencing frequent headaches, dizziness, and occasional blurred vision. He has a history of hypertension and Type 2 Diabetes, and his recent MRI suggests Alzheimer's with a high confidence level.",
  //     probable_diagnoses: [
  //       "Alzheimer's Disease",
  //       "Hypertensive crisis",
  //       "Diabetic complications",
  //     ],
  //     treatment_plans: [
  //       "Initiate Alzheimer's disease management with cholinesterase inhibitors",
  //       "Optimize blood pressure control",
  //       "Enhance diabetes management",
  //     ],
  //     lifestyle_modifications: [
  //       "Engage in regular physical exercise",
  //       "Adopt a heart-healthy diet, such as the DASH diet",
  //       "Monitor blood glucose levels regularly",
  //     ],
  //     medications: [
  //       {
  //         name: "Metformin",
  //         dosage: "1000 mg daily",
  //       },
  //       {
  //         name: "Lisinopril",
  //         dosage: "10 mg daily",
  //       },
  //       {
  //         name: "Cholinesterase inhibitor",
  //         dosage: "as per doctor's prescription",
  //       },
  //     ],
  //     additional_tests: [
  //       "Cognitive function tests",
  //       "Comprehensive metabolic panel",
  //       "Further neuroimaging studies if needed",
  //     ],
  //     precautions: [
  //       "Avoid activities that could lead to falls due to dizziness",
  //       "Monitor for signs of severe hypertension",
  //       "Regular check-ups for Alzheimer's progression",
  //     ],
  //     follow_up:
  //       "Schedule a follow-up in 4-6 weeks to assess treatment effectiveness and manage any new symptoms.",
  //     image_analysis: {
  //       prediction: "Alzheimer's Disease",
  //       confidence: "90% confidence level",
  //     },
  //   };

  //   // Use this dummy result to test the display
  //   setResult(dummyResult);
  // }, []);

  return (
    session && (
      <div className="bg-[url('/bg.svg')] bg-cover py-10 min-h-screen">
        <div className="max-w-3xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          {!result ? (
            <>
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
                  <Label htmlFor="currentMedications">
                    Current Medications
                  </Label>
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

                {/* upload image */}
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="image">Upload Image</Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </LabelInputContainer>

                <button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit"
                >
                  Submit &rarr;
                  <BottomGradient />
                </button>
              </form>
            </>
          ) : (
            <div className="result-container">
              <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200">
                Diagnosis Result
              </h2>
              <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                {result.diagnosis_details}
              </p>
              <div className="mt-4">
                <h3 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                  Image Analysis
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {result.image_analysis.prediction} -{" "}
                  {result.image_analysis.confidence}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                  Probable Diagnoses
                </h3>
                <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-300">
                  {result.probable_diagnoses.map((diagnosis, index) => (
                    <li key={index}>{diagnosis}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                  Treatment Plans
                </h3>
                <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-300">
                  {result.treatment_plans.map((plan, index) => (
                    <li key={index}>{plan}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                  Lifestyle Modifications
                </h3>
                <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-300">
                  {result.lifestyle_modifications.map((modification, index) => (
                    <li key={index}>{modification}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                  Medications
                </h3>
                <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-300">
                  {result.medications.map((medication, index) => (
                    <li key={index}>
                      {medication.name} - {medication.dosage}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                  Additional Tests
                </h3>
                <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-300">
                  {result.additional_tests.map((test, index) => (
                    <li key={index}>{test}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                  Precautions
                </h3>
                <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-300">
                  {result.precautions.map((precaution, index) => (
                    <li key={index}>{precaution}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                  Follow Up
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {result.follow_up}
                </p>
              </div>
            </div>
          )}
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
