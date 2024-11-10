import { Client } from "@gradio/client";

export async function POST(req) {
  try {
    const { name,
      age,
      symptoms,
      medicalHistory,
      currentMedications,
      recentVitalSigns, } = await req.json();
    const client = await Client.connect("yashbyname/NeuroGenAI");

    // prepare one single string with all the patient info
    const patient_info = `Name: ${name}
    Age: ${age}
    Symptoms: ${symptoms}
    Medical History: ${medicalHistory}
    Current Medications: ${currentMedications}
    Recent Vital Signs: ${recentVitalSigns}`;

    console.log("patient_info", patient_info);
    const result = await client.predict("/predict", {
      patient_info: patient_info,
    });

    return new Response(JSON.stringify({ data: result.data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}