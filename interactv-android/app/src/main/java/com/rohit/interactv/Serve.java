package com.rohit.interactv;

import android.app.Activity;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.PixelFormat;
import android.os.Build;
import android.os.CountDownTimer;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.Adapter;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import androidx.recyclerview.widget.ItemTouchHelper;
import androidx.recyclerview.widget.RecyclerView;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.Socket;
import com.rohit.interactv.Util.RestApi;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class Serve extends Service implements View.OnClickListener {
    private WindowManager windowManager;
    private View popUpView;
    private View exView;
    private View inView;
    private ImageView img;
    private  ImageView img2;
    private boolean isOpen = false;
    private Context context;
    TextView countdown;
    private Socket msocket;
    private ArrayList<String> list;
    FloatingRecycler madapter;
    Map<String, String> map;
    private String object_key = "";

    private RecyclerView recyclerView;

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    public void onCreate(){
        super.onCreate();
        setTheme(R.style.AppTheme);
        context = this;

        popUpView = LayoutInflater.from(this).inflate(R.layout.overlayout, null);
        img = popUpView.findViewById(R.id.insidious);
        exView = popUpView.findViewById(R.id.hidious);
        inView = popUpView.findViewById(R.id.yin);
        countdown = popUpView.findViewById(R.id.count_down);
        list=new ArrayList<>();

        map = new HashMap<>();


        connectToSocket();
        updateQuestions();

        recyclerView = popUpView.findViewById(R.id.pop_recycler);
        madapter = new FloatingRecycler(this,list);
        recyclerView.setAdapter(madapter);


        int LAYOUT_FLAG;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            LAYOUT_FLAG = WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY;
        } else {
            LAYOUT_FLAG = WindowManager.LayoutParams.TYPE_PHONE;
        }
        final RelativeLayout.LayoutParams imgParams = (RelativeLayout.LayoutParams)img.getLayoutParams();
        final WindowManager.LayoutParams params = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                LAYOUT_FLAG,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
                PixelFormat.TRANSLUCENT);

        params.gravity = Gravity.TOP | Gravity.LEFT;

        params.x = 0;
        params.y = 300;
        Log.d("step1","crasshed");
        windowManager = (WindowManager)getSystemService(WINDOW_SERVICE);

        Log.d("step2","crasshed");
        windowManager.addView(popUpView,params);

        Log.d("step3","crasshed");

        img.setOnClickListener(this);



        popUpView.setOnTouchListener(new View.OnTouchListener() {
            int initialX = 0;
            int initialY = 0;
            float touchX = 0;
            float touchY = 0;

            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {

                if (motionEvent.getAction() == MotionEvent.ACTION_DOWN ){
                    initialX = params.x;
                    initialY = params.y;

                    touchX = motionEvent.getRawX();
                    touchY = motionEvent.getRawY();
                    return true;
                }
                if (motionEvent.getAction() == MotionEvent.ACTION_UP){

                    if (motionEvent.getRawX() > 500){
                        imgParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
                        img.setLayoutParams(imgParams);
                    }else{
                        imgParams.removeRule(RelativeLayout.ALIGN_PARENT_RIGHT);
                    }
                    if (java.lang.Math.abs((motionEvent.getRawX() - touchX)) < 5){
                        exView.setVisibility(View.VISIBLE);
                        inView.setVisibility(View.GONE);
                        isOpen = true;
                    }
                    if (params.x > 0 && params.x < 500){
                        Log.d("its insisde", "huurey" + Resources.getSystem().getDisplayMetrics().widthPixels);
                        int k = params.x;
                        for(int i=k; i>=0; i--){
                            params.x = k--;
                            windowManager.updateViewLayout(popUpView, params);
                        }
                    }
//                    if (params.x > 500 && params.x <1080){
//                        Log.d("its insisde", "huurey" + params.x);
//                        int k = params.x;
//                        for(int i=k; i<Resources.getSystem().getDisplayMetrics().widthPixels; i++){
//                            params.x = k++;
//                            windowManager.updateViewLayout(popUpView, params);
//                        }
//                    }
                    return true;


                }

                if (motionEvent.getAction() == MotionEvent.ACTION_MOVE){
                    params.x = initialX + (int)(motionEvent.getRawX() - touchX);
                    params.y = initialY + (int)(motionEvent.getRawY() - touchY);
                    windowManager.updateViewLayout(popUpView, params);
                    return true;
                }


                return true;
            }
        });

    }

    private void updateQuestions() {
        msocket.on("popo", new Emitter.Listener() {
            @Override
            public void call(final Object... args) {
                Log.d("yoyo","bye");
                new Handler(Looper.getMainLooper()).post(new Runnable() {
                    public void run() {
                        list.clear();
                        JSONArray data = (JSONArray) args[0];
                        for(int i =0; i < data.length(); i++){
                            try {
                                JSONObject question = data.getJSONObject(i);
                                list.add(question.getString("question"));
                                object_key = question.getString("_id");
                                Log.d("yoyo", question.getString("question").toString());
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }

                        madapter.dataChange(list);
                        new CountDownTimer(10000,1000) {
                            @Override
                            public void onTick(long l) {
                                countdown.setText("R " + (int) (l/1000));
                            }

                            @Override
                            public void onFinish() {
                                boolean[] val = madapter.getVal();
                                int ansval =0;
                                if (val[0]==true){
                                    ansval = 1;
                                }
                                map.put("ansval", String.valueOf(ansval));
                                map.put("id", object_key);
                                map.put("emailid", "ajinkya@spit.ac.in");
                                Log.d("yoyo", map.toString());
                                RestApi.postRequest(context, new JSONObject(map));
                                list.clear();
                                madapter.dataChange(list);
                            }
                        }.start();
                    }
                });
            }
        });
    }

    private void connectToSocket() {
        SocketInstance socketInstance = new SocketInstance();
        msocket = socketInstance.getSocketInstance();
        msocket.connect();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (popUpView!= null){
            windowManager.removeView(popUpView);
        }
    }

    @Override
    public void onClick(View view) {
        if (exView.getVisibility() == View.VISIBLE){
            exView.setVisibility(View.GONE);
            inView.setVisibility(View.VISIBLE);

        }


    }
}
