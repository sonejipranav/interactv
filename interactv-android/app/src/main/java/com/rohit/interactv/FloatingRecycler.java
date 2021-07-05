package com.rohit.interactv;


import android.content.Context;
import android.graphics.drawable.TransitionDrawable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.Arrays;

public class FloatingRecycler extends RecyclerView.Adapter<FloatingRecycler.ViewHolder> {
    private boolean[] val;
    Context mcontext;
    private ArrayList<String> list;
    public FloatingRecycler(Serve serve, ArrayList<String> list) {
        this.list = list;
        mcontext = serve.getBaseContext();
        val = new boolean[getItemCount()];
        Arrays.fill(val, false);


    }

    public boolean[] getVal(){
        return val;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view  = LayoutInflater.from(parent.getContext()).inflate(R.layout.poll_layout, parent,false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolder holder, final int position) {
        holder.mtext.setText(list.get(position));
        holder.backgroundSet.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                TransitionDrawable transition = (TransitionDrawable) holder.backgroundSet.getBackground();
                transition.setCrossFadeEnabled(true);

                try {
                    if (val[position]) {
                        transition.reverseTransition(500);
                    } else {
                        transition.startTransition(500);
                        val[position] = true;
                    }
                }
                catch (Exception e){
                    Log.d("yoyo","this is baddd bruh");
                }
            }
        });
    }

    public void dataChange(ArrayList<String>list){
        this.list = list;
        val = new boolean[list.size()];
        Arrays.fill(val, false);
        notifyDataSetChanged();

    }


    @Override
    public int getItemCount() {
        try{
            return list.size();
        }catch (Exception e){
            return 0;
        }
    }

    static class ViewHolder extends RecyclerView.ViewHolder{
        public LinearLayout backgroundSet;
        public TextView mtext;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            backgroundSet = itemView.findViewById(R.id.inner_pop_layout);
            mtext = itemView.findViewById(R.id.question_text_view);
        }
    }

}


