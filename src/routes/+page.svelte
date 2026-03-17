<script lang="ts">
  import Map from "$lib/components/Map.svelte";
  import IconamoonArrowRight2 from "~icons/iconamoon/arrow-right-2";
  import { createQuery } from "@tanstack/svelte-query";
  import { geoApi } from "$lib/api/geoApi";

  let ipAddressKey = $state<string | null>("");

  const geoQuery = createQuery(() => ({
    queryKey: ["geo", ipAddressKey],
    queryFn: () => geoApi(ipAddressKey),
  }));

  let findLat = $derived(geoQuery.data?.location.lat ?? null);

  let findLng = $derived(geoQuery.data?.location.lng ?? null);

  console.log(geoQuery.data);
  $effect(() => {
    console.log("key", ipAddressKey);
  });
</script>

<div class="w-full overflow-hidden min-h-screen relative">
  <!--image-->
  <div class="relative w-full">
    <img
      src="/images/pattern-bg-desktop.png"
      alt="pattern-bg"
      class=" w-full h-60 object-cover"
    />
    <!--title-->
    <h1
      class="absolute text-2xl pt-4 font-semibold z-10 top-0 text-white translate-x-1/2 right-70 inset-x-0"
    >
      IP Address Tracker
    </h1>
    <!--input-->
    <div
      class="cursor-pointer flex rounded-xl h-10 bg-white absolute z-10 top-20 translate-x-1/2 w-100 left-80"
    >
      <input
        bind:value={ipAddressKey}
        placeholder="Enter Your ip address"
        type="text"
        class="w-95 p-3 text-gray-600 rounded-l-xl border-blue-500 border"
      />
      <button
        onclick={() => {}}
        class="bg-gray-700 px-4 h-10 rounded-r-xl text-white cursor-pointer"
        ><IconamoonArrowRight2 class="w-5 h-5" /></button
      >
    </div>
  </div>
  <!--data-->

  <div
    class="divide-x divide-gray-300 absolute z-10 h-fit bg-white grid grid-cols-4 gap-5 p-6 top-40 left-50 right-50 rounded-xl shadow-xl"
  >
    <div class=" text-xs text-gray-500 font-semibold">
      IP ADDRESS
      {#if geoQuery.isLoading}
        <div
          class="border border-t-blue-300 border-x-blue-400 border-b-blue-500 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Loading ...
        </div>
      {:else if geoQuery.isError}
        <div
          class="border border-x-red-500 border-t-red-300 border-b-red-600 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Failed
        </div>{:else if geoQuery.isSuccess}
        <div class=" text-lg pt-4 font-semibold text-black">
          <div class="text-sm text-gray-500">ip address:</div>
          {geoQuery.data.ip}
          <div class="text-sm text-gray-500">latitude.longitude:</div>
          {geoQuery.data.location.lat}.{geoQuery.data.location.lng}
        </div>
      {/if}
    </div>

    <div class=" text-xs text-gray-500 font-semibold">
      LOCATION {#if geoQuery.isLoading}
        <div
          class="border border-t-blue-300 border-x-blue-400 border-b-blue-500 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Loading ...
        </div>
      {:else if geoQuery.isError}
        <div
          class="border border-x-red-500 border-t-red-300 border-b-red-600 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Failed
        </div>
      {:else if geoQuery.isSuccess}
        <div class=" text-lg pt-4 font-semibold text-black">
          {geoQuery.data.location.country}
          {#if geoQuery.data.location.region || geoQuery.data.location.city}
            {#if geoQuery.data.location.region}
              ,{geoQuery.data.location.region}
              {#if geoQuery.data.location.city},{geoQuery.data.location
                  .city}{/if}{/if}
          {:else}{/if}
        </div>
      {/if}
    </div>
    <div class=" text-xs text-gray-500 font-semibold">
      TIMEZONE {#if geoQuery.isLoading}
        <div
          class="border border-t-blue-300 border-x-blue-400 border-b-blue-500 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Loading ...
        </div>
      {:else if geoQuery.isError}
        <div
          class="border border-x-red-500 border-t-red-300 border-b-red-600 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Failed
        </div>{:else if geoQuery.isSuccess}
        <div class=" text-lg pt-4 font-semibold text-black">
          UTC {geoQuery.data.location.timezone}
        </div>
      {/if}
    </div>
    <div class=" text-xs text-gray-500 font-semibold">
      ISP {#if geoQuery.isLoading}
        <div
          class="border border-t-blue-300 border-x-blue-400 border-b-blue-500 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Loading ...
        </div>
      {:else if geoQuery.isError}
        <div
          class="border border-x-red-500 border-t-red-300 border-b-red-600 rounded-lg px-4 py-1 mt-2 text-black w-fit text-sm"
        >
          Failed
        </div>{:else if geoQuery.isSuccess}
        <div class=" text-lg pt-4 font-semibold text-black">
          {geoQuery.data.isp}
        </div>
      {/if}
    </div>
  </div>

  <!--map success-->
  <div class="w-full relative grid place-items-center z-0">
    {#if geoQuery.isPending}
      <div
        class="border border-t-blue-300 border-x-blue-400 border-b-blue-500 rounded-lg px-4 py-1 mt-30 text-black w-fit text-sm"
      >
        Loading ...
      </div>
    {:else if geoQuery.isError}
      <div
        class="border border-x-red-500 border-t-red-300 border-b-red-600 rounded-lg px-4 py-1 mt-30 text-black w-fit text-sm"
      >
        Failed
      </div>{:else}
      <Map bind:findLat bind:findLng />
    {/if}
  </div>
</div>
