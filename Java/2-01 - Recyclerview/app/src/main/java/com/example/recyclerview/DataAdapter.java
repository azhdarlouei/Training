package com.example.recyclerview;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class DataAdapter extends RecyclerView.Adapter<DataAdapter.DataViewHolder> {
    private final ArrayList<Data> datas;
    private OnItemClickListener listener;

    public DataAdapter(ArrayList<Data> datas, OnItemClickListener listener) {
        this.datas = datas;
        this.listener = listener;
    }

    public class DataViewHolder extends RecyclerView.ViewHolder{
        TextView txt;

        public DataViewHolder(View itemView) {
            super(itemView);

            txt = itemView.findViewById(R.id.dataTitle);
        }
    }

    @NonNull
    @Override
    public DataViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.data_item, parent, false);

        return new DataViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull DataViewHolder holder, int position) {
        Data data = datas.get(position);
        holder.txt.setText(data.getData());
        holder.itemView.setOnClickListener(v->{
            listener.onItemClick(data);
        });
    }

    @Override
    public int getItemCount() {
        return datas.size();
    }

    public void addData (Data data){
        datas.add(data);
        notifyItemInserted(datas.size() - 1);
    }
}
