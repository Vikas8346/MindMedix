import { Client } from "@gradio/client";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const age = formData.get("age");
    const symptoms = formData.get("symptoms");
    const medicalHistory = formData.get("medicalHistory");
    const currentMedications = formData.get("currentMedications");
    const recentVitalSigns = formData.get("recentVitalSigns");
    const image = formData.get("image");

    const client = await Client.connect("yashbyname/NeuroGenAI");

    const patient_info = `Name: ${name}
    Age: ${age}
    Symptoms: ${symptoms}
    Medical History: ${medicalHistory}
    Current Medications: ${currentMedications}
    Recent Vital Signs: ${recentVitalSigns}`;

    console.log("patient_info", patient_info);
    console.log("image", image);

    const result = await client.predict("/predict", {
      patient_info: patient_info,
      image: image,
    });

    console.log("result", result);

    // sample response:
    // result {
    //   type: 'data',
    //   time: 2024-11-10T07:43:54.177Z,
    //   data: [
    //     '{\n' +
    //       '  "diagnosis_details": "The MRI images indicate a high confidence diagnosis of a tumor with a 94.21% probability.",\n' +
    //       '  "probable_diagnoses": [\n' +
    //       '    "Malignant tumor",\n' +
    //       '    "Benign tumor"\n' +
    //       '  ],\n' +
    //       '  "treatment_plans": [\n' +
    //       '    "Surgical intervention to remove the tumor",\n' +
    //       '    "Radiation therapy",\n' +
    //       '    "Chemotherapy"\n' +
    //       '  ],\n' +
    //       '  "lifestyle_modifications": [\n' +
    //       '    "Balanced diet with adequate nutrition",\n' +
    //       '    "Regular physical activity as tolerated",\n' +
    //       '    "Stress management techniques such as meditation"\n' +
    //       '  ],\n' +
    //       '  "medications": [\n' +
    //       '    {\n' +
    //       '      "name": "Pain management medication",\n' +
    //       '      "dosage": "As prescribed by the physician"\n' +
    //       '    },\n' +
    //       '    {\n' +
    //       '      "name": "Antiemetic drugs",\n' +
    //       '      "dosage": "To be taken as needed for nausea"\n' +
    //       '    }\n' +
    //       '  ],\n' +
    //       '  "additional_tests": [\n' +
    //       '    "Biopsy of the tumor for histopathological examination",\n' +
    //       '    "Blood tests for tumor markers",\n' +
    //       '    "CT scan for detailed imaging"\n' +
    //       '  ],\n' +
    //       '  "precautions": [\n' +
    //       '    "Regular monitoring of symptoms",\n' +
    //       '    "Avoidance of activities that could exacerbate symptoms",\n' +
    //       '    "Adherence to medication regimen"\n' +
    //       '  ],\n' +
    //       '  "follow_up": "Follow-up appointment with the oncologist within two weeks",\n' +
    //       '  "image_analysis": {\n' +
    //       '    "prediction": "Tumor",\n' +
    //       '    "confidence": "94.21%"\n' +
    //       '  }\n' +
    //       '}'
    //   ],
    //   endpoint: '/predict',
    //   fn_index: 0
    // }

    // convert this to JSON:

    const data = JSON.parse(result.data[0]);

    // print empty lines

    console.log("\n\n");

    console.log("data", data);

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
