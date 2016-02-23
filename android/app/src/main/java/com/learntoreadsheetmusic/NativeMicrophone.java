package com.learntoreadsheetmusic;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.puredata.android.io.AudioParameters;
import org.puredata.android.service.PdService;
import org.puredata.android.utils.PdUiDispatcher;
import org.puredata.core.PdBase;
import org.puredata.core.PdListener;
import org.puredata.core.utils.IoUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

public class NativeMicrophone extends ReactContextBaseJavaModule {
    private static final String TAG = "NativeMicrophone";

    private PdUiDispatcher dispatcher;

    private PdService pdService = null;
    private Context context;

    public NativeMicrophone(Context context) {
        super((ReactApplicationContext) context);
        this.context = context;
        pdConnection = new ServiceConnection() {
            @Override
            public void onServiceConnected(ComponentName name, IBinder service) {
                pdService = ((PdService.PdBinder) service).getService();
                try {
                    initPd();
                    loadPatch();
                } catch (IOException e) {
                    Log.e(TAG, e.toString());
                }
            }

            @Override
            public void onServiceDisconnected(ComponentName name) {
                // this method will never be called
            }
        };

        context.bindService(new Intent(context, PdService.class), pdConnection, context.BIND_AUTO_CREATE);
    }

    private final ServiceConnection pdConnection;


    private void start() {
        if (!pdService.isRunning()) {
            Intent intent = new Intent(context, MainActivity.class);
            pdService.startAudio(intent, R.drawable.icon,
                    "GuitarTuner", "Return to GuitarTuner.");
        }
    }

    private void initPd() throws IOException {
        // Configure the audio glue
        int sampleRate = AudioParameters.suggestSampleRate();
        start();
        Boolean isMicrophoneEnabled = AudioParameters.checkInputParameters(sampleRate, 1);
        if (isMicrophoneEnabled) {
            pdService.initAudio(sampleRate, 1, 2, 10.0f);
            pdService.startAudio();
            dispatcher = new PdUiDispatcher();

            // Create and install the dispatcher
            PdBase.setReceiver(dispatcher);

        } else throw new IOException("Microphone not enabled");
    }

    @ReactMethod
    public void addListener(final Callback callback) {
        Log.e("WTFWTFl", " adding listener...");

        if (dispatcher != null) {
            dispatcher.addListener("pitch", new PdListener.Adapter() {
                @Override
                public void receiveFloat(String source, final float floatReceived) {
                    Log.e("WTFWTFl", " hey I reiceived something:  " + floatReceived);
                    callback.invoke(floatReceived);
                }
            });
            Log.e("WTFWTFl", " hey dispatcher is ALL COOL and I was ableto addListener!");

        } else {
            Log.e("WTFWTFl", " hey dispatcher is nul");
        }

    }

    private void loadPatch() throws IOException {
        try {
            File dir = context.getFilesDir();
            IoUtils.extractZipResource(context.getResources().openRawResource(R.raw.tuner), dir, true);

            File patchFile = new File(dir, "tuner.pd");
            PdBase.openPatch(patchFile.getAbsolutePath());
            Log.i("WTFWTFl", "able to find tuner a-ok");

        } catch (FileNotFoundException e) {
            Log.i("WTFWTFl", "file not found: " + e.toString());
            e.printStackTrace();
        }
    }

    public void cleanUp() {
        context.unbindService(pdConnection);
    }

    @Override
    public String getName() {
        return "NativeMicrophone";
    }
}