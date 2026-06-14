package com.example.recyclerview;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class AdapterName extends RecyclerView.Adapter<AdapterName.NameViewHolder> {
    String[] names = {};
    int[] ids = {};
    public AdapterName() {
        TempListItem tempListItem = new TempListItem();

        names = tempListItem.getName();
        ids = tempListItem.getAvatar();
    }

    private ImageView imageview_item;
    private TextView textview_item;

    @NonNull
    @Override
    public NameViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.recyclerview_item, parent, false);
        return new AdapterName.NameViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull NameViewHolder holder, int position) {
        holder.setItems(names[position], ids[position]);
    }

    @Override
    public int getItemCount() {
        return names.length;
    }

    public class NameViewHolder extends RecyclerView.ViewHolder {
        public NameViewHolder(@NonNull View itemView) {
            super(itemView);
            imageview_item = itemView.findViewById(R.id.imageView);
            textview_item = itemView.findViewById(R.id.textView);
        }

        public void setItems(String name, int imageId) {
            textview_item.setText(name);
            imageview_item.setImageResource(imageId);
            imageview_item.setOnClickListener(v->{
                Toast.makeText(v.getContext(), name, Toast.LENGTH_SHORT).show();
            });
        }
    }
}
